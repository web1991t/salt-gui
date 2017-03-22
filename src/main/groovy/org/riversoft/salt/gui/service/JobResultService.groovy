package org.riversoft.salt.gui.service

import com.fasterxml.jackson.databind.ObjectMapper
import groovy.util.logging.Slf4j
import org.riversoft.salt.gui.domain.Job
import org.riversoft.salt.gui.domain.JobResult
import org.riversoft.salt.gui.model.view.JobResultDetailsViewModel
import org.riversoft.salt.gui.model.view.JobResultViewModel
import org.riversoft.salt.gui.model.view.JobResultsCountsViewModel
import org.riversoft.salt.gui.repository.JobRepository
import org.riversoft.salt.gui.repository.JobResultRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service

@Slf4j
@Service
class JobResultService {

    private String currentJid = ""

    //region injection

    @Autowired
    private ObjectMapper mapper

    @Autowired
    private JobRepository jobRepository

    @Autowired
    private JobResultRepository jobResultRepository

    @Autowired
    private SimpMessagingTemplate messagingTemplate

    //endregion

    /**
     * Обновление значения текущего jid
     * @param jid - уникальный номер работыn
     */
    def updateJid(String jid) {
        currentJid = jid
    }

    /**
     * Получение количества результатов выполнения работы по статусам
     * @return список моделей JobResultsCountsViewModel
     * @see JobResultsCountsViewModel
     */
    @Scheduled(fixedDelayString = '${salt.job_results.update_counts_interval:5000}')
    def findAllJobResultsCount() {

        List<Job> jobs = jobRepository.findAll()

        List<JobResultsCountsViewModel> resultsData = []

        for (Job job : jobs) {

            def notConnectedCount = job.results.findAll { !it.isResult }.size()

            def falseCount = job.results.findAll {
                it.jobResultDetails.findAll { !it.result } && it.isResult
            }.size()

            def trueCount = 0

            if (!falseCount) {
                trueCount = job.results.findAll {
                    it.jobResultDetails.findAll { it.result } && it.isResult
                }.size()
            }

            resultsData.add(
                    new JobResultsCountsViewModel(
                            jobName: job.name,
                            jid: job.jid,
                            notConnectedCounts: notConnectedCount,
                            falseCounts: falseCount,
                            trueCounts: trueCount
                    )
            )
        }

        sendJobResultsBySignal('/queue/job-results/update-counts-job-results', "result counts", resultsData)
    }

    /**
     * Поиск всех результатов работы
     */
    @Scheduled(fixedDelayString = '${salt.job_results.update_list_interval:5000}')
    def findAllResultsByJob() {

        if (currentJid) {

            Job job = jobRepository.findOne(currentJid)

            def results = job.results.collect { new JobResultViewModel(it) }

            sendJobResultsBySignal('/queue/job-results/update-all-results-by-job', "all results by job with jid [${currentJid}]", results)
        }
    }

    /**
     * Поиск деталей результата выполнения работы
     * @param resultId - уникальный идентификатор результата работы
     * @return список объктов JobResultDetailsViewModel
     * @see JobResultDetailsViewModel
     */
    List<JobResultDetailsViewModel> findDetailsByJobResult(String resultId) {

        log.debug("Start searching details by job result with id [${resultId}]")

        JobResult jobResult = jobResultRepository.findOne(resultId)

        List<JobResultDetailsViewModel> result = jobResult.jobResultDetails.collect {
            new JobResultDetailsViewModel(it)
        }

        log.debug("Finish searching details by job result with id [${resultId}], found [${result.size()}] details records.")

        return result
    }

    /**
     * Отправка данных результатов выполнения работы по статусам
     * @param signal - сигнал для отправки результатов
     * @param message - сообщение выполняемого действия
     * @param map - объект/мапа с данными
     */
    void sendJobResultsBySignal(String signal, String message, def map) {

        log.trace("Update ${message} to [${mapper.writeValueAsString(map)}].")

        messagingTemplate.convertAndSend(signal, mapper.writeValueAsString(map))
    }
}